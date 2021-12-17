import React from "react";
import { SummaryForm } from "../SummaryForm";
import {
  queryByRole,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("Initial conditions", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test("Checkbox enables button on first click and disables on second click", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  userEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  userEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("popover response to hover", async () => {
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  // getBy if it doesn't find the element will throw an error.
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  // The next line doesn't serve a purpose, but it makes the test more readable
  // and is considered better practice.
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  // The disappearance of the popover happens asynchronously.
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.getByText(/no ice cream will actually be delivered/i)
  );
});
