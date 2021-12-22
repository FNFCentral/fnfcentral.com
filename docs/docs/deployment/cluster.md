---
sidebar_position: 2
---

# Creating A Cluster

To host all the containers you need to create a Kubernetes cluster. Rancher makes this super easy!

:::tip Linode

If you are using Node like we do, you can follow steps 8 through 12 [here](https://www.linode.com/docs/guides/how-to-deploy-kubernetes-on-linode-with-rancher-2-x/#provision-a-cluster) and replacing `https://linode.github.io/rancher-ui-driver-linode/releases/v0.3.0/linode-addons.yml` with `https://linode.github.io/rancher-ui-driver-linode/releases/v0.4.0/linode-addons.yml`. Then, after the cluster is up, add a Load Balancer Service with the following yaml:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: ingress-nginx-controller
  namespace: ingress-nginx
spec:
  type: LoadBalancer
  externalTrafficPolicy: Local
  ipFamilyPolicy: SingleStack
  ipFamilies:
    - IPv4
  ports:
    - name: http
      port: 80
      protocol: TCP
      targetPort: http
      appProtocol: http
    - name: https
      port: 443
      protocol: TCP
      targetPort: https
      appProtocol: https
  selector:
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/component: controller
```

:::

## Provisioning Nodes

This is a very easy process. Just go to `Cluster Management` tab and click create. Decide what platform you will use and follow the steps.

FNF Central recommends two nodes at least for a "stable" cluster.

If you are using node creation we recommend at least 3 nodes (MUST be an odd number) with `etcd` role, at least 2 nodes with `Control Plane` role, and at least 2 nodes with the `Worker` role.

## Adding The Bitnami Charts

Bitnami has a ton of super helpful Helm charts which we will be using.

To add them to Rancher, simply enter your cluster in Rancher, go to `Repositories` under `Apps & Marketplace`. There, click the `Create` button put `https://charts.bitnami.com/bitnami` as the `Index URL`.

## Adding The QuestDB Charts

QuestDB hosts their own chart.

To add them to Rancher, simply enter your cluster in Rancher, go to `Repositories` under `Apps & Marketplace`. There, click the `Create` button put `https://helm.questdb.io/` as the `Index URL`

## Adding The FNF Central Charts

FNF Central has the charts that are required for FNF Central

To add them to Rancher, simply enter your cluster in Rancher, go to `Repositories` under `Apps & Marketplace`. There, click the `Create` button put `https://charts.fnfcentral.com` as the `Index URL`.

## Adding The Projects

To make sure that all the FNF Central things don't get mixed up, we will first create a few Rancher projects. Go to `Projects/Namespaces` under `Cluster` and click `Create Project`. Repeat this for the following:

- FNF Central
- Longhorn
- Monitoring

## Adding The Namespace

To add the namespaces, scroll to the project labeled `FNF Central`. Create a namespace for each of the following:

- fnfcentral
- fnfcentral-sql
- fnfcentral-questdb
- fnfcentral-cert-manager (Optional)

## Next?

Well, let's set up our storage solution!
