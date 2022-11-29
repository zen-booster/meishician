function initJobInfo(data) {
  const { name, companyName, jobTitle, city, domain } = data;
  return {
    name: {
      content: name,
      isPublic: true,
    },

    companyName: {
      content: companyName,
      isPublic: true,
    },
    jobTitle: {
      content: jobTitle,
      isPublic: true,
    },
    city: {
      content: city,
      isPublic: true,
    },
    domain: {
      content: domain,
      isPublic: true,
    },
  };
}

export default initJobInfo;
