local:
    BUILD ./kratos+local
    BUILD ./testing_metrics+local
    BUILD ./testing_ldap+local
    BUILD --build-arg MODE=loc ./website+local

canary:
    BUILD ./kratos+canary
    BUILD --build-arg MODE=canary ./website+canary
