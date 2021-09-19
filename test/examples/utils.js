import { createDirname } from '../../lib/buildtime/utils.js'
import { resolve } from 'path'
import { spawn } from 'child_process'
import fkill from 'fkill'

/**
 *
 * @param {string} path
 * @returns {Promise<{port: number, child: import('child_process').ChildProcessWithoutNullStreams, kill: Function}>}
 */
export const runViteDev = path =>
    new Promise((resolve, reject) => {
        try {
            const child = spawn('npms', ['run', 'dev'], { cwd: path })

            child.stdout.setEncoding('utf8')
            child.stderr.setEncoding('utf8')

            child.stdout.on('data', msg => {
                const match = msg.match(/Local: .+?(\d{4})/i)
                if (match) {
                    const port = Number(match[1])
                    resolve({
                        child,
                        port,
                        kill: () => fkill(child.pid, { force: true }),
                    })
                }
            })
            child.stderr.on('data', msg => {
                console.error('stderr', msg)
            })
        } catch (e) {
            console.error('couldnt spawn child', e)
            throw e
        }
    })

const dirname = createDirname(import.meta)

export const getPath = name => resolve(dirname, '..', '..', 'examples', name)
