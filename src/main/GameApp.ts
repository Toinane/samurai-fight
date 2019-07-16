import {app} from 'electron'
import GameView from './GameView'

export default class GameApp {

  private gameView: GameView

  constructor() {
    this.gameView = new GameView()

    this.initApplication()
  }

  private initApplication(): void {
    app.on('ready', () => {
      this.gameView.createWindow()
    })

    app.on('activate', () => this.gameView.createWindow())

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
  }
}
