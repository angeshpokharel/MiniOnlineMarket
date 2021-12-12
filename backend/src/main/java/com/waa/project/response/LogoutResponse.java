package com.waa.project.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@ToString
public class LogoutResponse implements ApiResponse {
  private String type;
  private String message;
}