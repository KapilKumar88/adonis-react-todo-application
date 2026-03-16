import { userProfileValidator } from '#validators/api/v1/user/profile'
import type { HttpContext } from '@adonisjs/core/http'
import string from '@adonisjs/core/helpers/string'
import drive from '@adonisjs/drive/services/main'
import { logFromContext } from '#helpers/common.helper'
import { FOLDER_KEYS } from '#config/drive'

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp']
const MAX_FILE_SIZE = '5mb'

async function resolveProfileImageUrl(key: string, request: HttpContext['request']): Promise<string> {
  const relativeUrl = await drive.use().getUrl(key)
  return `${request.protocol()}://${request.host()}${relativeUrl}`
}

export default class ProfileController {
  async show({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()

    if (user?.profileImage) {
      user.profileImage = await resolveProfileImageUrl(user.profileImage, request)
    }

    return response.ok({
      data: {
        "fullName": user?.fullName,
        "email": user?.email,
        "initials": user?.initials,
        "bio": user?.bio,
        "profileImage": user?.profileImage
      }
    })
  }

  async update(ctx: HttpContext) {
    const { auth, request, response, } = ctx
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

      const key = `${FOLDER_KEYS.PROFILES}/${string.uuid()}.${profileImage.extname ?? 'jpg'}`
      await profileImage.moveToDisk(key)

      user.profileImage = key
    }

    await user.save()

    logFromContext(ctx, {
      action: 'Updated profile',
      description: `${user.fullName} updated profile`,
      status: 'success',
      resource: 'Profile',
    })


    if (user?.profileImage) {
      user.profileImage = await resolveProfileImageUrl(user.profileImage, request)
    }

    return response.ok({
      data: {
        "fullName": user?.fullName,
        "email": user?.email,
        "initials": user?.initials,
        "bio": user?.bio,
        "profileImage": user?.profileImage
      }
    })
  }
}
