import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class RefreshTokenDTO {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ0MjgzYTUzLTlhNTctNDkyZi1iZjc1LTI3MjBkMGE2YjNjMSIsImxvZ2luIjoiSmVycnkiLCJpYXQiOjE2Nzc1MjgxNTcsImV4cCI6MTY3NzUzMTc1N30.mYIEVEGGPoFUuiJEsuFx_qh7difp0ckNN5Sz4jNP97Q',
    description: 'Access token',
  })
  accessToken: string;
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ0MjgzYTUzLTlhNTctNDkyZi1iZjc1LTI3MjBkMGE2YjNjMSIsImxvZ2luIjoiSmVycnkiLCJpYXQiOjE2Nzc1MjgxNTcsImV4cCI6MTY3NzYxNDU1N30.uipjqLbD-PNRa_uZpkkHd71vgXgUK0SgdOmecVOSANk',
    description: 'Refresh token',
  })
  @IsJWT()
  refreshToken: string;
}
