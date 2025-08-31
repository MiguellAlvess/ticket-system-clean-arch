import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const EVENT_ID = "51e88e26-c2f8-4f0c-8a75-498fd9dbedf7"

  const existing = await prisma.event.findUnique({
    where: { event_id: EVENT_ID },
  })

  if (!existing) {
    await prisma.event.create({
      data: {
        event_id: EVENT_ID,
        description: "Evento de teste para PurchaseTicket",
        event_price_in_cents: 100,
        date: new Date("2099-01-01T00:00:00Z"),
        capacity: 100,
      },
    })
    console.log(`Evento criado com id ${EVENT_ID}`)
  } else {
    console.log("Evento já existe, nada a fazer.")
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
