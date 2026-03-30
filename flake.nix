{
  description = "🍺The Grill dev environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }: flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = import nixpkgs { inherit system; };
    in {
      devShells.default = pkgs.mkShell {
      buildInputs = [
        pkgs.nodejs_25
        pkgs.nodePackages.npm
        pkgs.nodePackages.pnpm
        pkgs.nodePackages.yarn

        # TypeScript tooling
        pkgs.nodePackages.typescript

        pkgs.git
        pkgs.openssl
        # pkgs.postgresql
      ];

      shellHook = ''
        echo "Dev environment ready"
        node -v
        npm -v
      '';
    };
  });
}

