export interface UserProfile {
  name: string;
  avatar: string;
  position: string;
  location: string;
  email: string;
  address: string;
  phone: string;
  softwareSkills: UserProfileSoftwareSkill[];
  skills: string[];
  hobbies: string[];
  aboutMe: string;
  education: UserProfileEducation[];
  experience: UserProfileExperience[];
  joinDate: string;
  languages: string[];
  organization: string;
  department: string;
  birthday: string;
  skillProficiencies: UserProfileSkillProficiency[];
}

export interface UserProfileSoftwareSkill {
  icon: string;
  label: string;
}

export interface UserProfileEducation {
  institution: string;
  focus: string;
}

export interface UserProfileExperience {
  organization: string;
  position: string;
  location: string;
  logo: string;
}

export interface UserProfileSkillProficiency {
  skill: string;
  proficiency: number;
}
