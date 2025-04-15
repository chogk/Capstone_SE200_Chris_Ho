-- CreateTable
CREATE TABLE "Policy_Type" (
    "id" SERIAL NOT NULL,
    "type_of_policy" TEXT NOT NULL,

    CONSTRAINT "Policy_Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insurance_Policy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "base_price_sgd" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "type_of_policy_id" INTEGER NOT NULL,

    CONSTRAINT "Insurance_Policy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Policy_Holder" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "Policy_Holder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Policy_Subscription" (
    "policy_holder_id" TEXT NOT NULL,
    "insurance_policy_id" TEXT NOT NULL,

    CONSTRAINT "Policy_Subscription_pkey" PRIMARY KEY ("policy_holder_id","insurance_policy_id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "password" TEXT,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "refresh_token" TEXT,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Policy_Type_type_of_policy_key" ON "Policy_Type"("type_of_policy");

-- CreateIndex
CREATE UNIQUE INDEX "Policy_Holder_email_key" ON "Policy_Holder"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerAccountId_key" ON "Account"("providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- AddForeignKey
ALTER TABLE "Insurance_Policy" ADD CONSTRAINT "Insurance_Policy_type_of_policy_id_fkey" FOREIGN KEY ("type_of_policy_id") REFERENCES "Policy_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Policy_Subscription" ADD CONSTRAINT "Policy_Subscription_policy_holder_id_fkey" FOREIGN KEY ("policy_holder_id") REFERENCES "Policy_Holder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Policy_Subscription" ADD CONSTRAINT "Policy_Subscription_insurance_policy_id_fkey" FOREIGN KEY ("insurance_policy_id") REFERENCES "Insurance_Policy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
