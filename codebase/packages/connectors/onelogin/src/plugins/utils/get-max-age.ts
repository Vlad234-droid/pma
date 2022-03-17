import { TokenClaims } from '@pma-connectors/identity-api';

/**
 * Returns `maxAge` cookie property, based on the expiration claim returned from the identity token swap endpoint.
 *
 * @param expirationClaim expiration claim from the identity token swap endpoint
 */
export const getMaxAge = (claims: Pick<TokenClaims, 'exp'> | undefined) => {
  if (!claims?.exp || isNaN(Number(claims?.exp))) return 0;

  const expiration = Number(claims.exp) * 1000;
  const now = new Date().getTime();
  return expiration - now;
};
