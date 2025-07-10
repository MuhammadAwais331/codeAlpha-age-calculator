
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  // Utility: returns {years, months, days}
  function getPreciseAge(birthDate) {
    const today = new Date();

    // Reject future dates
    if (birthDate > today) return null;

    let years  = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth()     - birthDate.getMonth();
    let days   = (today.getDate()-1)      - birthDate.getDate();

    // Borrow a month if needed
    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0); // last day of previous month
      days += prevMonth.getDate();
    }

    // Borrow a year if needed
    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  }

  document.querySelector("#btn").addEventListener("click", e => {
    e.preventDefault();

    const dobInput = document.querySelector("#date").value;
    const output   = document.querySelector("#p2");

    if (!dobInput) return alert("Enter your Date of Birth!");

    const dob = new Date(dobInput); // parses YYYY‑MM‑DD safely in modern browsers
    const age = getPreciseAge(dob);

    if (!age) return alert("Future dates are not acceptable!");

    output.textContent =
      `your age is ${age.years} years, ${age.months} months and ${age.days} days.`;
  });
