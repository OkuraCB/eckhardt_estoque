import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtLoader from 'src/config/loaders/jwtLoader';

export interface JwtPayload {
  sub: number;
  name: string;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtLoader().jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    const { sub, email, name, role } = payload;
    return { userId: sub, email, name, role };
  }
}
