import { number } from "yargs";
import { Organization } from "./models/organization";
import { People } from "./models/people";
import { Repository } from "./models/repository";

const apiUrl = "https://api.github.com";

const commonHeaders = {
  Accept: "application/vnd.github.v3+json",
  Authorization: "Bearer " + process.env.REACT_APP_GITHUB_TOKEN,
};

export const getOrganization = async (): Promise<Organization> => {
  const response = await fetch(apiUrl + "/orgs/devaway", {
    headers: commonHeaders,
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

export const getPeople = async (
  role: string,
  filter: string
): Promise<Array<People>> => {
  var url = new URL(apiUrl + "/orgs/devaway/members");

  var params = { role, filter };

  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url.toString(), {
    headers: commonHeaders,
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

export type Order = "asc" | "desc";

export const getRepository = async (
  type: string,
  sort: string,
  direction: Order
): Promise<Array<Repository>> => {
  var url = new URL(apiUrl + "/orgs/devaway/repos");

  var params = { type, sort, direction };

  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url.toString(), {
    headers: commonHeaders,
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

export const userRegistry = async (
  firstName: string,
  lastName: string,
  email: string,
  company: string,
  phone: string
): Promise<boolean> => {
  var url = new URL(apiUrl + "/repos/devaway/users");

  const response = await fetch(url.toString(), {
    headers: commonHeaders,
    method: "POST",
    body: JSON.stringify({ firstName, lastName, email, company, phone }),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return response.json();
};
