import { Prisma, PrismaClient, User, PublicUser } from "@prisma/client"

const prisma = new PrismaClient()

export async function getPublicUser(userId: string): Promise<PublicUser> {
  try {
    const publicUser: PublicUser | null = await prisma.publicUser.findUnique({
      where: { id: userId }
    })
    if (!publicUser) throw new Error(`User not found`)
    return publicUser
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.error("Unique constraint violation:", error.message)
      } else if (error.code === "P2022") {
        console.error("Record not found:", error.message)
      } else {
        console.error("Prisma Client Known Request Error:", error.message)
      }
    }
    throw error
  }
}

export async function getECMSUser(userId: string): Promise<User> {
  try {
    const user: User | null = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        office: {
          include: {
            users: true,
            assignedInvestigations: {
              include: {
                complaint: { include: { complainer: true, institution: true } },
                investigationStages: {
                  include: { actions: { include: { user: true } } }
                },
                involvedParties: {
                  include: {
                    Institution: true,
                    Division: true,
                    Branch: true,
                    BeatOffice: true
                  }
                },
                institutionWorkflow: true
              }
            },
            involvedInvestigations: {
              include: {
                complaint: { include: { complainer: true, institution: true } },
                investigationStages: {
                  include: { actions: { include: { user: true } } }
                },
                involvedParties: true
              }
            },
            workflows: { include: { office: true, investigations: true } },
            Institution: {
              include: {
                complaints: {
                  include: { complainer: true, investigation: true }
                },
                divisions: {
                  include: { office: true }
                }
              }
            },
            Division: {
              include: {
                Institution: {
                  include: {
                    complaints: {
                      include: { complainer: true, investigation: true }
                    },
                    office: true
                  }
                },
                branches: {
                  include: { office: true }
                }
              }
            },
            Branch: {
              include: {
                Division: {
                  include: {
                    Institution: {
                      include: {
                        complaints: {
                          include: { complainer: true, investigation: true }
                        },
                        office: true
                      }
                    }
                  }
                },
                offices: { include: { office: true } }
              }
            },
            BeatOffice: {
              include: {
                Branch: {
                  include: {
                    Division: {
                      include: {
                        Institution: {
                          include: {
                            complaints: {
                              include: { complainer: true, investigation: true }
                            },
                            office: true
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })
    if (!user) throw new Error(`User not found`)
    return user
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.error("Unique constraint violation:", error.message)
      } else if (error.code === "P2022") {
        console.error("Record not found:", error.message)
      } else {
        console.error("Prisma Client Known Request Error:", error.message)
      }
    }
    throw error
  }
}

export async function getUser(userId: string): Promise<User> {
  try {
    const user: User | null = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        office: {
          include: {
            assignedInvestigations: {
              include: {
                investigationStages: {
                  include: { actions: { include: { user: true } } }
                }
              }
            },
            workflows: true
          }
        }
      }
    })
    if (!user) throw new Error(`User not found`)
    return user
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.error("Unique constraint violation:", error.message)
      } else if (error.code === "P2022") {
        console.error("Record not found:", error.message)
      } else {
        console.error("Prisma Client Known Request Error:", error.message)
      }
    }
    throw error
  }
}
