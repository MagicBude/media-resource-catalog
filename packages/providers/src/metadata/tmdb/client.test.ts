import { describe, expect, it, vi } from "vitest";
import { TmdbClient, TmdbHttpError } from "./client.js";

describe("TmdbClient", () => {
  it("uses Bearer application authentication", async () => {
    const fetchMock = vi.fn<typeof fetch>((_input, init) => {
      expect(init?.headers).toMatchObject({
        Accept: "application/json",
        Authorization: "Bearer token-123",
      });

      return Promise.resolve(
        new Response(JSON.stringify({ id: 11 }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );
    });

    const client = new TmdbClient("token-123", {
      fetchImpl: fetchMock,
    });

    await expect(
      client.get<{ id: number }>("movie/11"),
    ).resolves.toEqual({ id: 11 });
  });

  it("turns non-success responses into TmdbHttpError", async () => {
    const fetchMock = vi.fn<typeof fetch>(() =>
      Promise.resolve(
        new Response(
          JSON.stringify({
            status_code: 34,
            status_message:
              "The resource you requested could not be found.",
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          },
        ),
      ),
    );

    const client = new TmdbClient("token-123", {
      fetchImpl: fetchMock,
    });

    await expect(client.get("movie/999999999")).rejects.toBeInstanceOf(
      TmdbHttpError,
    );
  });
});
