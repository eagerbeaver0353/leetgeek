import mongoose from 'mongoose'
import { Project } from './models'

export const connectToDB = async () => {
  /**
   * 0: disconnected
   * 1: connected
   * 2: connecting
   * 3: disconnecting
   */
  if (!process.env.MONGO_URI) {
    throw new Error('Invalid environment variable: "MONGO_URI"')
  }

  const uri = process.env.MONGO_URI
  if (uri == undefined || mongoose.connection.readyState == 1) return
  try {
    await mongoose.connect(uri)
  } catch (error) {
    console.log('Error connecting to MongoDB')
  }
}

export const getProjectById = async (projectId) => {
  try {
    const result = await Project.findOne(
      {
        portfolioId: projectId,
      },
      {
        _id: 0,
      }
    ).populate('previews')
    if (!result) throw Error(`Can't find project with id ${projectId}`)
    return result
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getProjectsByIds = async (projectIds, pageNumber = 0, pageSize = 12) => {
  try {
    await connectToDB()
    const result = await Project.find(
      {
        portfolioId: {
          $in: projectIds,
        },
      },
      {
        _id: 0,
      }
    )
      .skip(pageNumber * pageSize)
      .limit(pageSize)
      .populate('previews')
    return result
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getProjectsByQuery = async (query, pageNumber = 0, pageSize = 12) => {
  try {
    await connectToDB()
    const result = await Project.find(
      {
        $or: [
          {
            title: new RegExp(query, 'ig'),
          },
          {
            description: new RegExp(query, 'ig'),
          },
        ],
      },
      {
        _id: 0,
      }
    )
      .skip(pageNumber * pageSize)
      .limit(pageSize)
      .populate('previews')
    return result
  } catch (error) {
    console.error(error)
    return []
  }
}
