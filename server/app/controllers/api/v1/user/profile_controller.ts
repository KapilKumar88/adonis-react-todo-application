import UserTransformer from '#transformers/user_transformer'
import { userProfileValidator } from '#validators/api/v1/user/profile'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { randomUUID } from 'node:crypto'
import { mkdir } from 'node:fs/promises'
import { extname } from 'node:path'

const UPLOAD_DIR = 'public/uploads/profiles'
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp']
const MAX_FILE_SIZE = '5mb'

export default class ProfileController {
  async show({ auth, serialize }: HttpContext) {
    return serialize(UserTransformer.transform(auth.getUserOrFail()))
  }

  async update({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const { fullName, bio } = await request.validateUsing(userProfileValidator)

    if (fullName !== undefined) {
      user.fullName = fullName
    }
    if (bio !== undefined) {
      user.bio = bio
    }

    const profileImage = request.file('profileImage', {
      size: MAX_FILE_SIZE,
      extnames: ALLOWED_EXTENSIONS,
    })

    if (profileImage) {
      if (!profileImage.isValid) {
        return response.unprocessableEntity({
          errors: profileImage.errors,
        })
      }

      const uploadPath = app.makePath(UPLOAD_DIR)
      await mkdir(uploadPath, { recursive: true })

      const fileName = `${randomUUID()}${extname(profileImage.clientName)}`
      await profileImage.move(uploadPath, { name: fileName })

      user.profileImage = `/uploads/profiles/${fileName}`
    }

    await user.save()
    return serialize(UserTransformer.transform(user))
  }
}
