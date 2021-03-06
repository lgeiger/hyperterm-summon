# hyperterm-summon
Summon your Hyperterm windows with a system-wide hotkey. In a multi-window situation, hyperterm-summon will remember which window was active last and restore focus to it. If HyperTerm is already active when the hotkey is pressed, your terminal windows will be hidden and (on macOS only) your previously-active application will regain focus.

## Installation
1. Open your Hyper config file (i.e. `~/.hyperterm.js`) in your preferred text editor.
1. Add `hyperterm-summon` to the plugins array found in the Hyper config.
1. Inside the Hyper `config` object, add a `summon` entry to house your `hyperterm-summon` config.
1. Within the `summon` entry, add a `hotkey` entry assigned your preferred shortcut key binding.

*NOTE:* For a list of valid shortcuts, see [Electron Accelerators](https://github.com/electron/electron/blob/master/docs/api/accelerator.md).

## Options
| Key        | Description                                       | Default |
| ---        | -----------                                       | ------- |
| `hotkey`   | Shortcut to toggle Hyper window visibility.       | None    |
| `hideDock` | Hide the Hyper icon in the dock and app switcher. | `false` |

## Example Config
```js
module.exports = {
  config: {
    summon: {
      hideDock: true,
      hotkey: 'Alt+Super+O'
    }
  },
  plugins: [
    'hyperterm-summon'
  ]
}
```
