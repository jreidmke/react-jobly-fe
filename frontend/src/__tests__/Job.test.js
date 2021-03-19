import React from "react";
import { render } from "@testing-library/react";
import Job from "../Job";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

it("renders without crashing", () => {
    render(
        <UserProvider>
            <MemoryRouter>
                <Job
                company="Pizza Co."
                title="pizza chef"
                salary={450}
                equity={.1}
                 />
            </MemoryRouter>
        </UserProvider>        
    )
});

it("matches the snapshot", () => {
    const {asFragment} = render(
        <UserProvider>
            <MemoryRouter>
                <Job
                company="Pizza Co."
                title="pizza chef"
                salary={450}
                equity={.1}
                 />
            </MemoryRouter>
        </UserProvider>          
    );
    expect(asFragment()).toMatchSnapshot();
});