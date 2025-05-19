export interface ICompany {
  company_name: string
  company_description: string
  start_date: string
  end_date: string
}

export interface IEducation {
  university_name: string
  degree: string
  start_date: string
  end_date: string
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
  linkedin_url?: string
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