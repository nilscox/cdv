import React, { useMemo } from 'react';

import { Grid, Typography } from '@material-ui/core';

class Not<T> {
  constructor(public readonly value: T | null | undefined) {}

  eval() {
    return this.value !== null && this.value !== undefined;
  }
}

export function not<T>(value: T | null | undefined): Not<T> {
  return new Not(value);
}

type FallbackProps<T> = {
  when?: boolean | Not<T>;
  fallback: string | React.ReactNode;
  minHeight?: number;
  render: (value: T) => React.ReactNode;
};

function Fallback<T>({ when, fallback, minHeight = 200, render }: FallbackProps<T>) {
  const [shouldRender, value] = useMemo<[boolean, T | undefined]>(() => {
    if (typeof when === 'undefined') {
      return [false, undefined];
    }

    if (typeof when === 'boolean') {
      return [!when, undefined];
    }

    if (when instanceof Not) {
      return [when.eval(), when.value];
    }

    return [false, undefined];
  }, [when]);

  if (!shouldRender) {
    return (
      <Grid container direction="column" justify="center" alignItems="center" style={{ minHeight }}>
        {typeof fallback === 'string' ? <Typography variant="body2">{fallback}</Typography> : fallback}
      </Grid>
    );
  }

  return <>{render(value)}</>;
}

export default Fallback;