import { NextApiRequest, NextApiResponse } from "next";
import S3 from 'aws-sdk/clients/s3'
import { nanoid } from 'nanoid';


const s3 = new S3({
    apiVersion: "2006-03-01",
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
    signatureVersion: 'v4'
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const l = (req.query.fileType as string).split("/")[1]; 
    const ex = l.split("?")[0];
    const userID = l.split("=")[1]
    const s3Params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${userID}/${nanoid(36)}.${ex}`,
        Expires: 60,
        ContentType: `video/${ex}`
    }

    const uploadUrl = await s3.getSignedUrl("putObject", s3Params);

    res.status(200).json({
        uploadUrl,
        key: s3Params.Key
    })

}