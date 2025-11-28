async function updateStaffDetails(staffId, casterName, animationDelay, socialPlatform, socialHandle) {
    try {
      $('.curtain' + staffId).css("animation-delay", animationDelay + "s");
      $('.' + staffId).css("animation-delay", (animationDelay - 0.15) + "s");

      if (socialPlatform && socialHandle) {
        $(`.${staffId} .socials`).html("&nbsp;" + socialHandle);
        $(`.${staffId} .socials`).css("display", "block");

        // Remove old platform classes before adding the new one
        $(`.${staffId} .socials`).removeClass().addClass(`socials ${socialPlatform}`);

        $(`.${staffId} .staffname`).html(casterName + "&nbsp;");
      } else {
        $(`.${staffId} .socials`).css("display", "none");
        $(`.${staffId} .staffname`).html(casterName);
      }

    } catch (error) {
      console.error('Error fetching ' + staffId + ' details:', error);
    }
  }

export default updateStaffDetails;