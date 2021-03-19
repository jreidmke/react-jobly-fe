import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import JobList from "../JobList";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

it("renders without crashing", () => {
    render(
        <UserProvider>
            <MemoryRouter>
                <JobList/>
            </MemoryRouter>
        </UserProvider>          
    )
});

it("matches the snapshot", () => {
    const {asFragment} = render(
        <UserProvider>
            <MemoryRouter>
                <JobList/>
            </MemoryRouter>
        </UserProvider>          
    );
    expect(asFragment()).toMatchSnapshot();
}); 

it("returns correct jobs when searched", async() => {
    const {getByPlaceholderText, getByText, queryByText} = render(
        <UserProvider>
            <MemoryRouter>
                <JobList/>
            </MemoryRouter>
        </UserProvider>          
    );
    const button = getByText("Search");
    const input = getByPlaceholderText("Search Here");
    fireEvent.change(input, { target: { value: 'on' }});
    fireEvent.click(button);
    // const conservator = waitFor(() => queryByText("Conservator"));
    // waitFor(() => expect(conservator).toBeInTheDocument());
})