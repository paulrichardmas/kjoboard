export interface ICompany {
  companyName?: string
  companyDescription?: string
  startDate?: string
  endDate?: string
}

export interface IEducation {
  universityName: string
  degree: string
  startDate: string
  endDate: string
}

export interface IUser {
  id: string
  username: string
}

export interface IProfile {
  bio?: string
  companies?: ICompany[]
  education?: IEducation
  email?: string
  linkedinUrl?: string
  location?: string
  name?: string
  phone?: string
  profile_id?: string
  title?: string
  user?: IUser
}

export interface IProfileState {
  profiles: IProfile[],
  profile: IProfile
}