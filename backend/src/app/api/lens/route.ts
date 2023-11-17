// Imports
// ========================================================
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LensClient, development } from "@lens-protocol/client";

// Config
// ========================================================
const lensClient = new LensClient({
  environment: development,
});

// Functions
// ========================================================
/**
 * List
 * @param request
 * @returns
 */
export const GET = async (request: NextRequest) => {
  try {
    const publications = await lensClient.profile.fetch({
        forProfileId: "0x0635",
      })
    // Return
    return NextResponse.json(
      {
        data: publications,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    // Return
    return NextResponse.json(
      {
        error: error?.message ?? error,
      },
      {
        status: 200,
      }
    );
  }
};
