import {Invitation} from '../entities/invitation.entity'

export interface InvitationRepository {
  findAllByEmails(emails: string[]): Promise<Invitation[]>
  findOneById(id: string): Promise<Invitation>
  create(entity: Invitation): Promise<void>
  deleteById(id: string): Promise<void>
}

export const InvitationRepository = Symbol('InvitationRepository')
