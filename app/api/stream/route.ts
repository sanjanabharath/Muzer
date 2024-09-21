import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "../auth/lib/db";
import { YT_REGEX } from "../auth/lib/utils";

const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});
export async function POST(req: NextRequest) {
  try {
    const data = CreateStreamSchema.parse(await req.json());
    const isYt = YT_REGEX.test(data.url);

    if (!isYt) {
      return NextResponse.json(
        {
          message: "Invalid URL",
        },
        {
          status: 411,
        }
      );
    }
    prismaClient.stream.create({
      userId: data.creatorId,
      url: data.url,
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Error while parsing the data",
      },
      {
        status: 411,
      }
    );
  }
}
