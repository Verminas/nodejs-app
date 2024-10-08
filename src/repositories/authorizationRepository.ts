const authorizationsUsers: {[userName: string]: string} = {
  admin: '12345'
}

export const authorizationRepository = {
  isBasicAuthUser(strBase64: string): boolean {
    const b64auth = strBase64.split(' ')[1] || ''
    if(b64auth){
      const [userName, password] = Buffer.from(b64auth, 'base64').toString().split(':')
      if(userName in authorizationsUsers) {
        return true
      }
    }
    return false
  }
}