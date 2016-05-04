import { div } from '@cycle/dom'
import { Button, Icon } from 'StyleFn'

import constants from 'constants.css'

const first = {
  style: {
    marginRight: '40px',
    width: '357px'
  },
  items: [{
    background: '#21406a',
    style: {
      marginBottom: '20px',
      width: '100%'
    },
    text: 'Log in'
  }, {
    background: '#21406a',
    state: 'hover',
    style: {
      marginBottom: '20px',
      width: '100%'
    },
    text: 'Log in'
  }, {
    background: '#21406a',
    state: 'active',
    style: {
      marginBottom: '20px',
      width: '100%'
    },
    text: 'Log in'
  }, {
    background: '#21406a',
    state: 'busy',
    style: {
      width: '100%'
    },
    text: 'Log in'
  }]
}

const second = {
  style: {
    marginRight: '40px'
  },
  items: [{
    background: '#de4249',
    style: {
      marginBottom: '20px'
    },
    text: 'Remove'
  }, {
    background: '#de4249',
    state: 'hover',
    style: {
      marginBottom: '20px'
    },
    text: 'Remove'
  }, {
    background: '#de4249',
    state: 'active',
    style: {
      marginBottom: '20px'
    },
    text: 'Remove'
  }, {
    background: '#de4249',
    state: 'busy',
    style: {},
    text: 'Remove'
  }]
}

const third = {
  style: {
    marginRight: '40px'
  },
  items: [{
    background: '#a6bcd9',
    skin: 'narrow',
    style: {
      marginBottom: '20px'
    },
    text: 'Cancel'
  }, {
    background: '#a6bcd9',
    skin: 'narrow',
    state: 'hover',
    style: {
      marginBottom: '20px'
    },
    text: 'Cancel'
  }, {
    background: '#a6bcd9',
    skin: 'narrow',
    state: 'active',
    style: {
      marginBottom: '20px'
    },
    text: 'Cancel'
  }, {
    background: '#a6bcd9',
    skin: 'narrow',
    state: 'busy',
    style: {},
    text: 'Cancel'
  }]
}

const fourth = {
  style: {
    marginRight: '40px'
  },
  items: [{
    background: '#de4249',
    skin: 'narrow',
    style: {
      marginBottom: '20px'
    },
    text: 'Save & Close'
  }, {
    background: '#de4249',
    skin: 'narrow',
    state: 'hover',
    style: {
      marginBottom: '20px'
    },
    text: 'Save & Close'
  }, {
    background: '#de4249',
    skin: 'narrow',
    state: 'active',
    style: {
      marginBottom: '20px'
    },
    text: 'Save & Close'
  }, {
    background: '#de4249',
    skin: 'narrow',
    state: 'busy',
    style: {},
    text: 'Save & Close'
  }]
}

const fifth = {
  style: {
    marginRight: '40px'
  },
  items: [{
    background: '#de4249',
    skin: 'narrow',
    style: {
      marginBottom: '20px'
    },
    icon: 'Remove'
  }, {
    background: '#de4249',
    skin: 'narrow',
    state: 'hover',
    style: {
      marginBottom: '20px'
    },
    icon: 'Remove'
  }, {
    background: '#de4249',
    skin: 'narrow',
    state: 'active',
    style: {
      marginBottom: '20px'
    },
    icon: 'Remove'
  }, {
    background: '#de4249',
    skin: 'narrow',
    state: 'busy',
    style: {},
    icon: 'Remove'
  }]
}

const sixth = {
  style: {
    marginRight: '40px'
  },
  items: [{
    background: '#90bf5a',
    skin: 'narrow',
    style: {
      marginBottom: '20px'
    },
    icon: 'Edit',
    text: 'Edit'
  }, {
    background: '#90bf5a',
    skin: 'narrow',
    state: 'hover',
    style: {
      marginBottom: '20px'
    },
    icon: 'Edit',
    text: 'Edit'
  }, {
    background: '#90bf5a',
    skin: 'narrow',
    state: 'active',
    style: {
      marginBottom: '20px'
    },
    icon: 'Edit',
    text: 'Edit'
  }, {
    background: '#90bf5a',
    skin: 'narrow',
    state: 'busy',
    style: {},
    icon: 'Edit',
    text: 'Edit'
  }]
}

const columns = [
  first,
  second,
  third,
  fourth,
  fifth,
  sixth
]

const buttonsChildren = [{
  name: '',
  fn: div({
    style: {
      display: 'flex'
    }
  }, [
    columns.map(column => div({
      style: {
        ...column.style
      }
    }, [
      column.items.map(button => Button({
        ...button
      }))
    ]))
  ])
}]

const buttons = {
  name: 'Button',
  children: buttonsChildren,
  style: {
    width: '940px'
  }
}

const specialButtonsChildren = [{
  name: 'Switch states',
  fn: div({
    style: {
      display: 'flex',
      fontSize: '17px',
      color: constants.primary1,
      width: '150px'
    }
  }, [
    Icon({
      icon: 'List',
      style: {
        marginRight: '15px'
      }
    }),
    Icon({
      icon: 'Grid',
      style: {
        marginRight: '30px'
      }
    }),
    Icon({
      icon: 'List',
      style: {
        marginRight: '15px'
      }
    }),
    Icon({
      icon: 'Grid'
    })
  ])
}, {
  name: 'Text buttons',
  style: {
    marginTop: '20px'
  },
  fn: div({
    style: {}
  }, [
    Button({
      icon: 'Back',
      text: 'Back to search',
      skin: 'narrow',
      background: 'transparent',
      style: {
        color: constants.primary1,
        fontSize: '12px'
      }
    }),
    Button({
      icon: 'Plus',
      text: 'Upload new photo',
      skin: 'narrow',
      background: 'transparent',
      style: {
        color: constants.color2,
        fontSize: '12px'
      }
    })
  ])
}]

const specialButtons = {
  name: '',
  children: specialButtonsChildren,
  style: {
    width: '150px'
  }
}

export { buttons, specialButtons }
