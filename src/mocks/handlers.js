import { rest } from "msw";

// Handlers are basically an array from get and post methods.

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanillar.png" },
      ])
    );
  }),
];
