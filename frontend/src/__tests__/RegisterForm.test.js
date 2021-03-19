import React from "react";
import { render } from "@testing-library/react";
import RegisterForm from "../RegisterForm";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
