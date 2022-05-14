interface CmdOption {
  month?: number;
  help?: true;
}

export function parseOption(): CmdOption {
  const [, , month, monthCount] = process.argv;
  if (month === '-h' || month === 'help') {
    return {
      help: true
    };
  }
  if (month !== '-m' && month !== '--month') {
    throw new Error('option invalid');
  }

  return {
    month: Number.parseInt(monthCount, 10)
  };
}
