import { Avatar } from 'StyleFn'
import avatarPng from 'assets/img/avatar.png'

const avatarMale = Avatar({
  icon: 'Male',
  size: '62'
})

const avatarFemale = Avatar({
  icon: 'Female',
  size: '62'
})

const avatarLocation = Avatar({
  icon: 'Hospital',
  size: '62'
})

const avatarImage = Avatar({
  image: avatarPng,
  size: '62'
})

const avatar = {
  name: 'Avatar',
  children: [{
    name: 'Male',
    fn: avatarMale,
    style: {
      marginRight: '10px'
    }
  }, {
    name: 'Female',
    fn: avatarFemale,
    style: {
      marginRight: '10px'
    }
  }, {
    name: 'Location',
    fn: avatarLocation,
    style: {
      marginRight: '10px'
    }
  }, {
    name: 'Image',
    fn: avatarImage
  }],
  style: {
    marginRight: '40px'
  }
}

export default avatar
export { avatarMale, avatarFemale, avatarImage }
