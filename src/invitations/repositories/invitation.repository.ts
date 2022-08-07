import {Invitation} from '../entities/invitation.entity'

export interface InvitationRepository {
  findByEmails(emails: string[]): Promise<Invitation[]>
  create(entity: Invitation): Promise<void>
}

export const InvitationRepository = Symbol('InvitationRepository')
