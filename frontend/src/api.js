import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ...

  /**Returns a list of all companies */
  static async getAllCompanies() {
    let res = await this.request(`companies`);
    return res.companies;
  }

  /**Returns a list a companies filtered by search body */
  static async getCompanies(name) {
    let res = await this.request(`companies`, {name});
    if(res.companies.length===0) {
      alert("No companies match search term");
    }
    return res.companies;
  }

  /**Returns a list of all jobs */
  static async getAllJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  /**Returns a list of jobs filtered by search term */
  static async getJobs(title) {
    let res = await this.request(`jobs`, {title});
    return res.jobs;
  }

  /**Login Form Route. Returns Token */
  static async login(body) {
    let res = await this.request(`auth/token`, body, 'post');
    this.token = res.token;
    return res.token;
  }

  /**Register form route. Returns token */
  static async register(body) {
    let res = await this.request(`auth/register`, body, 'post');
    this.token = res.token;
    return res.token;
  }

  static async getCurrUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async editUser(username, edits) {
    let res = await this.request(`users/${username}`, edits, 'patch');
    return res.user;
  }

  static async applyToJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, 'post');
    return res.applied;
  }

}


export default JoblyApi;