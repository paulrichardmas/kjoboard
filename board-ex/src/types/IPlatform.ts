export interface IPlatform {
  platformId: string,
  name: string,
  platformUrl: string,
  url: string,
  company: string,
  title: string,
  location: string,
  description: string,
  applications: string,
  postedDate: string,
}

export interface IPlatformState {
  platforms: IPlatform
}