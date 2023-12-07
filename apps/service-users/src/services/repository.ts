import { eq } from 'drizzle-orm';
import { v4 as uuidV4 } from 'uuid';
import { db } from '../main';
import { Paginated, Pagination } from '@learning-platform-monorepo/types';
import { users } from '../schema';
import { logger } from '@learning-platform-monorepo/logger';
export type GoogleUser = {
  picture?: string;
  id: string;
  name: string;
  image: string;
  googleId: string;
  email: string;
  locale?: string;
  given_name?: string;
  family_name?: string;
};
type UserDto = {
  id: string;
  role: string;
  name: string;
  image?: string;
  googleId: string;
};
export type User = typeof users.$inferSelect;

export async function list({
  skip,
  limit,
}: Pagination): Promise<Paginated<User>> {
  logger.debug('Users list request= ' + JSON.stringify({ skip, limit }));
  const dbUsers = await db
    .select()
    .from(users)
    .limit(limit)
    .offset(skip * limit);
  // const dbusersCount = await this.db.from(users);
  const count = 0;
  return { items: dbUsers || [], count };
}

export async function getById(id: string) {
  logger.debug('Users getById request= ' + JSON.stringify({ id }));
  const dbUsers = await this.db.select().from(users).where(eq(users.id, id));
  if (dbUsers && dbUsers.length) {
    return dbUsers[0];
  }
  null;
}
export async function getByGoogleId(googleId: string): Promise<UserDto | null> {
  logger.debug('Users googleId request= ' + JSON.stringify({ googleId }));
  const dbUsers = await this.db
    .select()
    .from(users)
    .where(eq(users.googleId, googleId));
  if (dbUsers && dbUsers[0]) {
    return dbUsers[0] as UserDto;
  }
  return null;
}
export async function updateGoogleInfo(user: GoogleUser): Promise<undefined> {
  logger.debug('Users updateGoogleInfo request= ' + JSON.stringify({ user }));
  await this.db
    .update(users)
    .set({
      name: user.name || `${user.given_name} ${user.family_name}`,
      image: user.picture,
      googleId: user.id,
      email: user.email,
      locale: user.locale,
    })
    .where(eq(users.id, user.id));
}
export async function create({
  email,
  image,
  given_name,
  family_name,
  googleId,
}: {
  email: string;
  image?: string;
  given_name: string;
  family_name: string;
  googleId: string;
}): Promise<UserDto> {
  logger.debug(
    'Users create request = ' +
      JSON.stringify({ email, image, given_name, family_name, googleId })
  );
  return (
    await this.db
      .insert(users)
      .values({
        id: uuidV4(),
        role: 'USER',
        googleId: googleId,
        email,
        image,
        name: `${given_name} ${family_name}`,
      })
      .returning({
        id: users.id,
        role: users.role,
        name: users.name,
        image: users.image,
        googleId: users.googleId,
      })
  )[0];
}
