import { Avatar } from 'StyleFn'
import avatarPng from 'assets/img/avatar.png'

const avatarStyle = {
  fontSize: '62px',
  width: '62px'
}

const avatarMale = Avatar({
  icon: 'Male',
  style: avatarStyle
})

const avatarFemale = Avatar({
  icon: 'Female',
  style: avatarStyle
})

const avatarLocation = Avatar({
  icon: 'Hospital',
  style: avatarStyle
})

const avatarImage = Avatar({
  image: avatarPng,
  style: avatarStyle
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
