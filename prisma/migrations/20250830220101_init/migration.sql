-- CreateTable
CREATE TABLE "public"."Event" (
    "event_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "event_price_in_cents" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "public"."Ticket" (
    "ticket_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "ticket_price_in_cents" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticket_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_email_key" ON "public"."Ticket"("email");

-- AddForeignKey
ALTER TABLE "public"."Ticket" ADD CONSTRAINT "Ticket_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."Event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;
