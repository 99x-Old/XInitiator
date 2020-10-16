export const hasAccess = (level: number, role: string) => {
    if (role === "Member") {
      switch (level) {
        case 0:
          return true;
        case 1:
          return true;
        default:
          return false;
      }
    } else if (role === "Lead") {
      switch (level) {
        case 0:
          return true;
        case 1:
          return true;
        case 2:
          return true;
        default:
          return false;
      }
    }
    else if (role === "Evaluator") {
      switch (level) {
        case 0:
          return true;
        case 1:
          return true;
        case 2:
          return true;
        case 3:
          return true;
        default:
          return false;
      }
    }else if (role === "SuperAdmin") {
      return true;
    }
  }