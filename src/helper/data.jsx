// update task url
export const updateURL = (url) =>
  `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${url}?company_id=${
    import.meta.env.VITE_COMPANY_ID
  }`;

// delete a task url
export const deleteURL = (url) =>
  ` https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${url}?company_id=${
    import.meta.env.VITE_COMPANY_ID
  }`;
