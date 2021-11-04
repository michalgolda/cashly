import { render } from "@testing-library/react";
import withTheme from "../../utilities/withTheme";
import Modal from "./Modal";

test("renders Modal component", () => {
    render(withTheme(Modal));
})