function isValidStringField(value, minLength = 3, maxLength = 50) {
  const trimmed = value.trim();

  return (
    typeof value === "string" &&
    trimmed.length >= minLength &&
    trimmed.length <= maxLength &&
    /^[a-zA-Z0-9\s\-_.]+$/.test(trimmed)
  );
}

function isValidLaunch(launch) {
  return (
    isValidStringField(launch.mission) &&
    isValidStringField(launch.rocket) &&
    isValidStringField(launch.target) &&
    typeof launch.launchDate === "string" &&
    !isNaN(new Date(launch.launchDate).valueOf())
  );
}

module.exports = { isValidLaunch };
