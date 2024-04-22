import Button from "./Button";

export default {
  title: "Components/Button",
  component: Button,
};

export const DefaultButton = {
  args: {
    children: "Button",
  },
};

export const PrimaryButton = {
  args: {
    children: "Primary button",
    $primary: true,
  },
};
