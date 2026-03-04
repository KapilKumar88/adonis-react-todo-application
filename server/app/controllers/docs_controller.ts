import app from '@adonisjs/core/services/app'
import type { HttpContext } from '@adonisjs/core/http'
import { readFile } from 'node:fs/promises'

export default class DocsController {
  /**
   * Serve the Swagger UI HTML page via Edge template
   */
  async ui({ view }: HttpContext) {
    return view.render('docs/swagger', {
      title: 'Todo Application',
      specUrl: '/docs/openapi.yaml',
    })
  }

  /**
   * Serve the raw OpenAPI YAML spec file
   */
  async spec({ response }: HttpContext) {
    const filePath = app.makePath('swagger/openapi.yaml')
    const content = await readFile(filePath, 'utf-8')
    return response.header('Content-Type', 'text/yaml; charset=utf-8').send(content)
  }
}
