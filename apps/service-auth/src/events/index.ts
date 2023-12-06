const getGoogleUserName = (googleUserData) =>
  `${googleUserData.given_name} ${googleUserData.family_name}`;
export const createUpdateUserEvent = (dbUser: any, googleUserData: any) => {
  const event = {
    type: 'UPDATE_USER',
    payload: {
      id: dbUser.id,
      name: dbUser.name || getGoogleUserName(googleUserData),
      image: googleUserData.picture,
      googleId: googleUserData.id,
      email: googleUserData.email,
      locale: googleUserData.locale,
    },
  };
  return event;
};
export const createCreateUserEvent = (googleUserData: any) => {
  const event = {
    type: 'CREATE_USER',
    payload: {
      googleId: googleUserData.id,
      email: googleUserData.email,
      image: googleUserData.picture,
      name: getGoogleUserName(googleUserData),
      locale: googleUserData.locale,
    },
  };
  return event;
};
