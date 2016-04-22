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
    fn: avatarMale
  }, {
    name: 'Female',
    fn: avatarFemale
  }, {
    name: 'Location',
    fn: avatarLocation
  }, {
    name: 'Image',
    fn: avatarImage
  }]
}

export default avatar
export { avatarMale, avatarFemale, avatarImage }
