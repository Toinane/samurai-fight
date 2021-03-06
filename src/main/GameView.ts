import {BrowserWindow, BrowserWindowConstructorOptions} from 'electron';
import LanConnection from './LanConnection';

export default class GameView {
  protected window?: BrowserWindow

  protected view: string
  protected connection: LanConnection

  protected windowParams: BrowserWindowConstructorOptions = {
    minWidth: 440,
    minHeight: 150,
    icon: `${__dirname}/logo.png`
  }

  constructor () {
    this.view = 'game'
  }

  public createWindow (): BrowserWindow {
    if (this.window) return this.window

    this.window = new BrowserWindow(this.windowParams)
    this.window.loadURL(`file://${__dirname}/${this.view}.html`)
    this.window.on('closed', this.closeWindow)
    
    this.connection = new LanConnection()
    
    // this.initWindowEvents()
    // this.initEvents()
    return this.window
  }

  protected closeWindow (): void {
    if (this.window) this.window.close()
    this.window = undefined
  }

  public getWindow (): BrowserWindow {
    if (this.window instanceof BrowserWindow) {
      return this.window
    } else {
      return this.createWindow()
    }
  }

  public sendEvent (channel: string, ...args: any[]): void {
    if (!this.window) return

    return this.window.webContents.send(channel, args)
  }
}