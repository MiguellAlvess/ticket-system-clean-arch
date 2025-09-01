import { PrismaClient } from "@prisma/client"

export default interface DatabaseConnection {
  query<T>(callback: (prisma: PrismaClient) => Promise<T>): Promise<T>
  close(): Promise<void>
}

export class PrismaAdapter implements DatabaseConnection {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async query<T>(callback: (prisma: PrismaClient) => Promise<T>): Promise<T> {
    return callback(this.prisma)
  }

  async close(): Promise<void> {
    await this.prisma.$disconnect()
  }
}
