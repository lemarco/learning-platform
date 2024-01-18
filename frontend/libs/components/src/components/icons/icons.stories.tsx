import type { Meta, StoryObj } from "storybook-framework-qwik";
import {
  MetamaskIcon,
  DownArrowIcon,
  BurgerIcon,
  EnglishFlagIcon,
  ExploreDesignWorkIcon,
  GithubIcon,
  GoogleIcon,
  SearchIcon,
  LikeIcon,
} from "./";

const meta: Meta = {
  component: MetamaskIcon,
};

type Story = StoryObj;

export default meta;

export const Icons: Story = {
  render: () => (
    <div class="bg-blue-200 w-[25%] grid grid-cols-12  gap-2">
      <MetamaskIcon />
      <GithubIcon />
      <GoogleIcon />
      <DownArrowIcon />
      <BurgerIcon />
      <ExploreDesignWorkIcon />
      <EnglishFlagIcon />
      <SearchIcon />
      <LikeIcon />
    </div>
  ),
};
